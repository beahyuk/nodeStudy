# 簇状条形图
import sys,xlsxwriter,json,uuid

def test(data):
  a = data[0][0]
  b = data[1][0]
  return a + b


def createXls(data):
  # 生成随机文件名
  uuid_str = uuid.uuid4().hex
  generateFileName = uuid_str+".xlsx"
  # 图放置位置
  # 图放置位置先强制性放在A1上😇
  chartPos = "A1"
  # 图类型
  chartType = data[0][0]
  # 图标题
  chartTitle = data[0][1]
  # x,y轴名
  xAxisNname =data[0][2]
  yAxisNname =data[0][3]
  # x,y轴数据
  yAxis = data[1][0]
  xAxis = data[1][1]
  xAxisColumn = chr(xAxis-2+64) # x轴列名
  yAxisColumn = chr(yAxis-2+64) # y轴列名
  xAxisData = data[xAxis] # x轴数据
  yAxisData = data[yAxis] # y轴数据
  xAxisdataLen = len(xAxisData) # x轴数据长度
  yAxisdataLen = len(yAxisData) # y轴数据长度
  print("y轴列表",yAxisColumn) 
  print("x轴列表",xAxisColumn) 


  # 表格的表头放置位置
  # 头数据先强制性从A16开始😇
  headDataPos = "A16"
  # 表头数据
  headings = data[2]
  
  # 获取所需要的列名
  columnDataLen = len(data) - 3
  columnPosArr = [chr(i + 64)  for i in range(1,columnDataLen+1)]
  
  # 创建表
  workbook = xlsxwriter.Workbook(generateFileName)
  worksheet = workbook.add_worksheet()
  bold = workbook.add_format({"bold":1})

  # 填写数据
  # 写入行数据，表头数据
  worksheet.write_row(headDataPos,headings,bold)

  # 对表数据进行循环遍历
  for columnPos in columnPosArr:
    worksheet.write_column(columnPos+str(17),data[ord(columnPos)-64+2]),

  # 创建图
  chart = workbook.add_chart({'type':chartType})

  # 配置图系列
  chart.add_series({
    'name':'=Sheet1!%s$%s'%(xAxisColumn,16),
    'categories':'=Sheet1!$%s$%s:$%s$%s'%(yAxisColumn, 17,yAxisColumn,yAxisdataLen+17),
    'values':'=Sheet1!$%s$%s:$%s$%s,'%(xAxisColumn, 17,xAxisColumn,xAxisdataLen+17)
  })
  print(yAxisColumn,yAxisData)


  # 添加标题和坐标题目
  chart.set_title({'name':chartTitle})
  chart.set_x_axis({'name':xAxisNname}) 
  chart.set_y_axis({'name':yAxisNname})

  # 将图插入表中
  worksheet.insert_chart(chartPos,chart)
  workbook.close()


if __name__ == "__main__":
  data = sys.stdin.readline()[:-1]
  data = json.loads(data)
  print(data) #dict 字典
  createXls(data)


