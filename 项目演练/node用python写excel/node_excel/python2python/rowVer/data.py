from getExcel_row import createXls

if __name__ == "__main__":
  data_row = [
    ["apple",1 ,2, 6, 3, 4 ,0.00],
    ["pear",0, 1, 2, 3, 4,"是小数啊"],
    ["banana",2, 4, 6, 8, 10,"aa"],
    ["peach",3, 6, 9, 12, 15,"bb"],
    ["mango",5 , 12, 54, 22,11,"bb"],
    ["mango",5 , 12, 54, 22,11,"bb"],
    ["mango",5 , 12, 54, 22,11,"bb"],
    ["mango",5 , 12, 54, 22,11,"bb"],
    ["mango",5 , 12, 54, 22,11,"bb"]
  ]
  xAxis = 2
  yAxis = 0
  chartType="line"
  chartTitles = ["图标题","x轴标题","y轴标题"]
  excel_title = "xx月报表汇总表"
  head = ["Number","Batch1","Batch2","Batch3","Batch4","Batch5","Batch6"]
  
  print("data:%s,yAxis:%s,xAxis:%s,chartType:%s,chartTitles:%s,excel_title:%s,head:%s"%(type(data_row),type(yAxis),type(xAxis),type(chartType),type(chartTitles),type(excel_title),type(head)))
  # 生成无图的excel
  # createXls(data_row,head,excel_title)

  # 生成有图的excel
  createXls(data_row,head,excel_title,xAxis=xAxis,yAxis=yAxis,chartType=chartType,chartTitles=chartTitles)
  