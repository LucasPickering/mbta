from rest_framework import serializers

from . import models


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Station


class StationIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StationInterval
