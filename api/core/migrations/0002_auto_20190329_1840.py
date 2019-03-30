# Generated by Django 2.1.7 on 2019-03-29 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='lat',
            field=models.DecimalField(decimal_places=6, default=42.361145, max_digits=8),
        ),
        migrations.AddField(
            model_name='station',
            name='lon',
            field=models.DecimalField(decimal_places=6, default=-71.057083, max_digits=8),
        ),
    ]
