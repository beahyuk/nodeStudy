import xlsxwriter,sys,json

# data = sys.stdin.read()
# data = json.loads(data)

data = sys.stdin.readline()[:-1]
data = json.loads(data)

# data = '{"fruit":"苹果"}'
# data = json.loads(data)
print(data)
print(type(data))
workbook = xlsxwriter.Workbook('unicode_python3.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write('B3', str(data))

workbook.close()

