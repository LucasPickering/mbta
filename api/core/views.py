from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Avg

from . import models, serializers


DOW_MAP = {"S":1, "M":2, "T": 3, "W": 4, "R": 5, "F": 6, "U": 7}


class StationsView(generics.ListAPIView):
    queryset = models.Station.objects.all()
    serializer_class = serializers.StationSerializer


class EntriesIntervals(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()
    serializer_class = serializers.StationResponseSerializer

    def get(self, request, **kwargs):
        queryset = self.get_queryset()
        # Perform filtering by start/end date
        if "start_date" in request.GET:
            sd = request.GET["start_date"]
            ed = request.GET.get("end_date", sd)

            queryset = queryset.filter(date__range=(sd, ed))

        elif "end_date" in request.GET:
            queryset = queryset.filter(date=request.GET["end_date"])

        if "days_of_week" in request.GET:
            days = [DOW_MAP[d] for d in request.GET["days_of_week"].split(",") if d in DOW_MAP]

            queryset = queryset.filter(date__week_day__in=days)

        

        summary = queryset.values("start_time").annotate(
            avg_entries=Avg("entries")
        )
        stations = queryset.values("start_time", "station_id").annotate(
            avg_entries=Avg("entries")
        )

        serializer = self.serializer_class(
            {"summary": summary, "stations": stations}
        )
        return Response(serializer.data)
