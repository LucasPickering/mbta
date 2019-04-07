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

class StationSummarySerializer(serializers.ModelSerializer):

    representation = serializers.SerializerMethodField()

    class Meta:
        model = models.StationInterval
        fields = ("representation",)

    def get_representation(self, data):
        counts = data.values("start_time").annotate(avg_entries=Avg("entries"))
        output = [{"start_time": c["start_time"], "entries": c["avg_entries"]} for c in counts]

        return output

class StationSpecificSerializer(serializers.ModelSerializer):

    representation = serializers.SerializerMethodField()

    class Meta:
        model = models.StationInterval
        fields = ("representation",)

    def get_representation(self, data):
        counts = data.values("start_time", "station_id").annotate(avg_entries=Avg("entries"))
        
        output = {}
        for c in counts:
            sid = c["station_id"]
            time = c["start_time"]
            entries = c["avg_entries"]

            if sid not in output:
                output[sid] = {}

            output[sid].update({time:entries})
        
        return output
