from django.db import models


LINES = {
    "blue": "Blue Line",
    "green": "Green Line",
    "orange": "Orange Line",
    "red": "Red Line",
}


class Station(models.Model):
    gtfs_id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    line = models.CharField(max_length=10, choices=LINES.items())


class StationInterval(models.Model):
    station = models.ForeignKey(Station, on_delete=models.PROTECT)
    date = models.DateField()
    start_time = models.PositiveSmallIntegerField()
    entries = models.PositiveSmallIntegerField()
