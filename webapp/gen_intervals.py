import json
import random

minute_offsets = [0, 15, 30, 45]

data = [
    {"start_time": t + mo, "entries": random.randrange(5, 100)}
    for mo in minute_offsets
    for t in range(300, 2400, 100)
]

with open("src/data/intervals.json", "w") as f:
    json.dump(data, f, indent=4)
