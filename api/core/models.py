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


class StationInterval(models.Model):
    station = models.ForeignKey(Station, on_delete=models.PROTECT)
    date = models.DateField()
    start_time = models.PositiveSmallIntegerField()
    entries = models.PositiveSmallIntegerField()
