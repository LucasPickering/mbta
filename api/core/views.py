from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Avg, Min, Max

from . import models, serializers

DOW_MAP = {"S":1, "M":2, "T": 3, "W": 4, "R": 5, "F": 6, "U": 7}

LINE_MAP = {"B": "blue", "G": "green","O":"orange", "R":"red",  "S": "silver"}

class StationsView(generics.ListAPIView):
    queryset = models.Station.objects.all()
    serializer_class = serializers.StationSerializer


class EntriesIntervals(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()
    serializer_class = serializers.StationResponseSerializer

    def get(self, request, **kwargs):
        queryset = self.get_queryset()
        
        if "start_date" in request.GET:
            sd = request.GET["start_date"]
            ed = request.GET.get("end_date", sd)

            queryset = queryset.filter(date__range=(sd, ed))

        elif "end_date" in request.GET:
            queryset = queryset.filter(date=request.GET["end_date"])

        if "days_of_week" in request.GET:
            days = [DOW_MAP[d] for d in request.GET["days_of_week"].split(",") if d in DOW_MAP]

            queryset = queryset.filter(date__week_day__in=days)

        if "lines" in request.GET:
            lines = [LINE_MAP[l] for l in request.GET["lines"].split(",") if l in LINE_MAP]

            queryset = queryset.filter(station__lines__overlap=lines)

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


class DateRange(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()
    serializer_class = serializers.DateRangeSerializer

    def get(self, request, **kwargs):
        queryset = self.get_queryset()

        daterange = queryset.aggregate(
                max_date=Max("date"), 
                min_date=Min("date")
                )

        serializer = self.serializer_class(daterange)

        return Response(serializer.data)
