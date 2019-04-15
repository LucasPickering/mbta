from collections import defaultdict
from rest_framework import serializers

from . import models


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Station
        fields = "__all__"


class StationSummarySerializer(serializers.Serializer):
    start_time = serializers.IntegerField()
    avg_entries = serializers.FloatField()


class StationSpecificSerializer(serializers.Serializer):
    def to_representation(self, data):
        # Build a dict: {station: {time: entries}}
        station_resp = defaultdict(dict)
        for interval in data:
            sid = interval["station_id"]
            time = interval["start_time"]
            entries = interval["avg_entries"]

            station_resp[sid].update({time: entries})
        return station_resp


class StationResponseSerializer(serializers.Serializer):
    summary = StationSummarySerializer(many=True)
    stations = StationSpecificSerializer()

class DateRangeSerializer(serializers.Serializer):
    min_date = serializers.DateField()
    max_date = serializers.DateField()
    