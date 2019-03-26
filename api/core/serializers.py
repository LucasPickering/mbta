from rest_framework import serializers

from . import models


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Station
        fields = "__all__"


class StationIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StationInterval
        exclude = ("id",)
