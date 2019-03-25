from rest_framework import mixins
from rest_framework import generics

from . import models, serializers, views


class EntriesByStationView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = models.StationInterval.objects.select_related("station")
    # serializer_class = serializers.EntryIntervalSerializer

    # def get(self, request, **kwargs):
    #     queryset = self.get_queryset()

    #     serializer = self.serializer_class(player)
