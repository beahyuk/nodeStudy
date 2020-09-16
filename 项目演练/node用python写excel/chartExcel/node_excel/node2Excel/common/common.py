# 簇状条形图
import sys,xlsxwriter,json

def createXls(data):
  workbook = xlsxwriter.Workbook('common_chart.xlsx')
  worksheet = workbook.add_worksheet()
  bold = workbook.add_format({"bold":1})
  # 定义表头
  headings = data["headings"]

  worksheet.write_row(data["pos"][1],headings,bold)
  worksheet.write_column('A17',data["categories"]),
  worksheet.write_column('B17',data["value1"]),
  worksheet.write_column('C17',data["value2"]),

  # 创建图
  chart = workbook.add_chart({'type':data["type"]})

  # 配置第一个系列
  dataLen = len(data["value1"]) 
  chart.add_series({
    'name':'=Sheet1!$B$16',
    'categories':'=Sheet1!$A$17:$A$%s'%(dataLen+17),
    'values':'=Sheet1!$B$17:$B$%s,'%(dataLen+17)
  })

  # # 配置第二个系列 
  chart.add_series({
    'name':'=Sheet1!$C$16',
    'categories':'=Sheet1!$A$17:$A$%s'%(dataLen+17),
    'values':'=Sheet1!$C$17:$C$%s,'%(dataLen+17)
  })

  # # 添加标题和坐标题目
  chart.set_title({'name':data["title"]})
  chart.set_x_axis({'name':data["X_axis_name"]}) 
  chart.set_y_axis({'name':data["Y_axis_name"]})

  # # 将图插入表中
  worksheet.insert_chart(data["pos"][0],chart)

  workbook.close()
if __name__ == "__main__":
  data = sys.stdin.readline()[:-1]
  data = json.loads(data)
  print(data) #dict 字典
  createXls(data)