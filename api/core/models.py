from django.db import models
from django.contrib.postgres.fields import ArrayField


LINES = {
    "blue": "Blue Line",
    "green": "Green Line",
    "orange": "Orange Line",
    "red": "Red Line",
    "silver": "Silver Line",
}


class Station(models.Model):
    gtfs_id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    lines = ArrayField(models.CharField(max_length=10, choices=LINES.items()))
    lat = models.DecimalField(max_digits=8, decimal_places=6, default=42.361145)
    lon = models.DecimalField(max_digits=8, decimal_places=6, default=-71.057083)


class StationInterval(models.Model):
    station = models.ForeignKey(Station, on_delete=models.PROTECT)
    date = models.DateField()
    start_time = models.PositiveSmallIntegerField()
    entries = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = (("station", "date", "start_time"),)
