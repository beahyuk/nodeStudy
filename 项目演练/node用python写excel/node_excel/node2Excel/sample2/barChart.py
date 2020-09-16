# 簇状条形图
import sys,xlsxwriter
data = sys.stdin.readline()[:-1]
data = eval(data)


workbook = xlsxwriter.Workbook('bar_chart.xlsx')
worksheet = workbook.add_worksheet()
bold = workbook.add_format({"bold":1})
# 定义表头
headings = ["Number","Batch1","Batch2"]


worksheet.write_row('A1',headings,bold)
worksheet.write_column('A2',data[0]),
worksheet.write_column('B2',data[1]),
worksheet.write_column('C2',data[2]),

# 创建图
chart = workbook.add_chart({'type':'bar'})

# 配置第一个系列
# Batch1的图
chart.add_series({
  'name':'=Sheet1!$B$1',
  'categories':'=Sheet1!$A$2:$A$7',
  'values':'=Sheet1!$B$2:$B$7,'
})

# 配置第二个系列 请注意使用替代语法来定义范围。
#  [sheetname, first_row, first_col, last_row, last_col]
# chart.add_series({
#   'name':['Sheet1',0,2],
#   'categories':['Sheet1',1,0,6,0],
#   'values': ['Sheet1',1,2,6,2],
# })
# 或者用这种方式
chart.add_series({
  'name':'=Sheet1!$C$1',
  'categories':'=Sheet1!$A$2:$A$7',
  'values':'=Sheet1!$C$2:$C$7,'
})

# 添加标题和坐标题目
chart.set_title({'name':'results of sample analysis'})
chart.set_x_axis({'name':'test number'}) 
chart.set_y_axis({'name':'Sample length(mm)'})

# 将图插入表中
worksheet.insert_chart('D2',chart,{'x_offset':25,'y_offset':10})

# 创建第二个图
chart1 = workbook.add_chart({'type':'column'})
chart1.add_series({
  'name':'=Sheet1!$B$1',
  'categories':'=Sheet1!$A$2:$A$7',
  'values':'=Sheet1!$B$2:$B$7,'
})
line_chart1 = workbook.add_chart({'type':'line'})

line_chart1 .add_series({
  'name':['Sheet1',0,2],
  'categories':['Sheet1',1,0,6,0],
  'values': ['Sheet1',1,2,6,2],
})
# 结合两种图
chart1.combine(line_chart1)

chart1.set_title({'name':'results of sample analysis'})
chart1.set_x_axis({'name':'test number'}) 
chart1.set_y_axis({'name':'Sample length(mm)'})
worksheet.insert_chart('D19',chart1,{'x_offset':25,'y_offset':10})


workbook.close()