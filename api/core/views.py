from rest_framework import generics

from . import models, serializers


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
