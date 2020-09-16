import sys,json

for line in sys.stdin:
  result = json.dumps(json.loads(line))
print(result)

# { a: '1', b: '2' }