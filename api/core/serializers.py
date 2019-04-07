from rest_framework import serializers
from django.db.models import Avg

from . import models


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Station
        fields = "__all__"


class StationIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StationInterval
        exclude = ("id",)

class StationSummarySerializer(serializers.Serializer):

    start_time = serializers.IntegerField()
    avg_entries = serializers.FloatField()

class StationSpecificSerializer(serializers.Serializer):

    start_time = serializers.IntegerField()
    avg_entries = serializers.FloatField()
    station_id = serializers.CharField()

class StationResponseSerializer(serializers.Serializer):
    summary = StationSummarySerializer(many=True)
    stations = StationSpecificSerializer(many=True)
