from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Avg

from . import models, serializers


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
