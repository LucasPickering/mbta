from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Avg

from . import models, serializers


def intervals(request):

    intervals = models.StationInterval.objects.order_by("start_time")
    ##TODO: improve on filtering portion
    if "date" in request.GET:
        intervals = intervals.filter(date=request.GET["date"])
    
    summ_ser = serializers.StationSummarySerializer(intervals)
    specific_ser = serializers.StationSpecificSerializer(intervals)

    return JsonResponse({"summary":summ_ser.data["representation"], "stations":specific_ser.data["representation"]})


class StationsView(generics.ListAPIView):
    queryset = models.Station.objects.all()
    serializer_class = serializers.StationSerializer


class StationIntervalsView(generics.ListAPIView):
    queryset = models.StationInterval.objects.all()[:100]
    serializer_class = serializers.StationIntervalSerializer


class EntriesByStationView(generics.ListAPIView):
    queryset = models.StationInterval.objects.select_related("station")
    # serializer_class = serializers.EntryIntervalSerializer

    # def get(self, request, **kwargs):
    #     queryset = self.get_queryset()

    #     serializer = self.serializer_class(player)
