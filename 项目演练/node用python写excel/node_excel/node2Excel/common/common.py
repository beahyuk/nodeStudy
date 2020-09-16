# 簇状条形图
import sys,xlsxwriter,json

def createXls(data):
  # 生成文件名
  generateFileName = data["fileName"]+".xlsx"
  # 图放置位置
  chartPos = data["chartPos"]["column"] + str(data["chartPos"]["row"])
  # 图类型
  chartType = data["type"]
  # 图标题
  chartTitle = data["title"]
  # 
  XAxisNname =data["XAxisNname"]
  YAxisNname =data["YAxisNname"]
  # 第一个数据放的位置列
  startDataColumn = data["columnPos"][0]
  # 第一个数据放的位置行
  startDataRow =data["chartPos"]['row']+15
  # 表格的表头放置位置
  headDataPos = startDataColumn + str(startDataRow)

  # 种类数据开始位置 
  categoryDataPos = startDataColumn + str(startDataRow+1)
  # 种类数据
  categoriesData = data["categories"]

  # 值1数据放置列
  value1DataColumn = data["columnPos"][1] 
  # 值1数据开始位置
  value1DataPos = value1DataColumn+ str(startDataRow+1)

  # 值2数据放置列
  value2DataColumn = data["columnPos"][2] 
  # 值2数据开始位置
  value2DataPos = value2DataColumn + str(startDataRow+1)
  # 值1和值2的数据
  value1Data = data["value1"]
  value2Data = data["value2"]
  # 值1数据的长度
  dataLen = len(value1Data) 
  dataEndRow = str(startDataRow+1+dataLen)
  # 创建表
  workbook = xlsxwriter.Workbook(generateFileName)
  worksheet = workbook.add_worksheet()
  bold = workbook.add_format({"bold":1})

  # 定义表头
  headings = data["headings"]
  worksheet.write_row(headDataPos,headings,bold)
  worksheet.write_column(categoryDataPos,categoriesData),
  worksheet.write_column(value1DataPos,value1Data),
  worksheet.write_column(value2DataPos,value2Data),

  # 创建图
  chart = workbook.add_chart({'type':chartType})

  # 配置第一个系列
  dataLen = len(value1Data) 
  chart.add_series({
    'name':'=Sheet1!%s$%s'%(value1DataColumn,str(startDataRow)),
    'categories':'=Sheet1!$%s$%s:$%s$%s'%(startDataColumn, str(startDataRow+1),startDataColumn,dataEndRow),
    'values':'=Sheet1!$%s$%s:$%s$%s,'%(value1DataColumn, str(startDataRow+1),value1DataColumn,dataEndRow)
  })

  # # 配置第二个系列 
  chart.add_series({
    'name':'=Sheet1!$%s$%s'%(value2DataColumn,str(startDataRow)),
    'categories':'=Sheet1!$%s$%s:$%s$%s'%(startDataColumn, str(startDataRow+1),startDataColumn,dataEndRow),
    'values':'=Sheet1!$%s$%s:$%s$%s,'%(value2DataColumn, str(startDataRow+1),value2DataColumn,dataEndRow)
  })

  # # 添加标题和坐标题目
  chart.set_title({'name':chartTitle})
  chart.set_x_axis({'name':XAxisNname}) 
  chart.set_y_axis({'name':YAxisNname})

  # # 将图插入表中
  worksheet.insert_chart(chartPos,chart)

  workbook.close()
if __name__ == "__main__":
  data = sys.stdin.readline()[:-1]
  data = json.loads(data)
  print(data) #dict 字典
  createXls(data)


