from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Avg

from . import models, serializers


class StationsView(generics.ListAPIView):
    queryset = models.Station.objects.all()
    serializer_class = serializers.StationSerializer


class StationIntervalsView(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()[:100]
    serializer_class = serializers.StationIntervalSerializer


class EntriesIntervals(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()
    serializer_class = serializers.StationResponseSerializer

    def get(self, request, **kwargs):
     
        queryset = self.get_queryset()
        ## Perform filtering
        if "start_date" in request.GET:

            sd = request.GET["start_date"]
            ed = request.GET.get("end_date", sd)

            queryset = queryset.filter(date__range=(sd, ed))
        
        summary = queryset.values("start_time").annotate(avg_entries=Avg("entries"))
        stations = queryset.values("start_time", "station_id").annotate(avg_entries=Avg("entries"))

        serializer = self.serializer_class({"summary":summary, "stations":stations})
        data = serializer.data

        summary_resp = data["summary"] 

        station_resp = {}
        for s in data["stations"]:
            sid = s["station_id"]
            time = s["start_time"]
            entries = s["avg_entries"]

            if sid not in station_resp:
                station_resp[sid] = {}

            station_resp[sid].update({time:entries})

        return JsonResponse({"summary":summary_resp, "stations":station_resp})

