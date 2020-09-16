# 柱状图
import sys,xlsxwriter

data = sys.stdin.readline()[:-1]
# 字符串转为多维数组
# eval() 函数用来执行一个字符串表达式，并返回表达式的值。
data = eval(data)

workbook = xlsxwriter.Workbook('testChart.xlsx')
worksheet = workbook.add_worksheet()

# 新建chart对象
# column 柱形图
chart = workbook.add_chart({'type':'column'})

worksheet.write_column('A1',data[0])
worksheet.write_column('B1',data[1])
worksheet.write_column('C1',data[2])

# 配置图表, 只添加一些数据序列
chart.add_series({'values': '=Sheet1!$A$1:$A$5'})
chart.add_series({'values': '=Sheet1!$B$1:$B$5'})
chart.add_series({'values': '=Sheet1!$C$1:$C$5'})

# 将图表插入工作表
worksheet.insert_chart('A7',chart)
workbook.close()