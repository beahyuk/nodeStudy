import sys,xlsxwriter,uuid
import numpy as np

def createXls(data,head,excel_title,xAxis=0,yAxis=0,chartType="null",chartTitles=[]):
  ############################数据配置###########################################
  # 生成随机文件名
  uuid_str = uuid.uuid4().hex
  generateFileName = uuid_str+".xlsx"

  #########图数据配置############
  # 判断图存在
  if(chartTitles !=[]):
    # 图放置位置
    # 图放置位置先强制性放在B3上😇
    chartPos = "B3"
    # 图标题
    chartTitle = chartTitles[0]
    # x,y轴名
    xAxisNname =chartTitles[1]
    yAxisNname =chartTitles[2]
    # x,y轴列名,如"A","B"
    xAxisColumn = chr(xAxis+65+1) #图从B开始放置就是+1
    yAxisColumn = chr(yAxis+65+1) 
    # x,y轴数据
    xAxisData = list(np.array(data).T[xAxis]) 
    yAxisData = list(np.array(data).T[yAxis])
    # x,y轴数据长度
    xAxisdataLen = len(xAxisData) 
    yAxisdataLen = len(yAxisData) 
    # 图样式,Excel的“设计”选项卡上可用的48种内置样式之一
    setStyle = 10
    # 图偏移
    x_offset = 10
    y_offset = 0
    # 数据开始的行数
    startRow = 19
  else:
    startRow = 2

  #########表数据配置############
  # 获取数据列数，行数
  colLen = len(data[0])
  rowLen = len(data)

  # 表标题
  title_row = 1
  # 合并列数开始和结尾
  colStart = "B"
  colEnd = chr(colLen+64+1)
  # 设置列的宽度
  colWidth = 13
  # 标题字体大小
  title_fontSize = 24
  # 标题格式:加粗,居中
  title_format = {
    'bold': 1,
    'align': 'center',
    'valign': 'vcenter',}

  # 表格的表头放置位置
  # 头数据先强制性从B19开始😇
  startCol = "B"
  while True:
    try:
      ############################表相关配置###########################################
      # 创建表
      workbook = xlsxwriter.Workbook(generateFileName,{'constant_memory':True})
      # 设置sheet名为 execl_title
      worksheet = workbook.add_worksheet(excel_title)

      # 样式设定
      # 1.设置头部样式
      head_format = workbook.add_format({"bold":1})
      head_format.set_align("right")
      head_format.set_pattern(1)
      head_format.set_bg_color('#cfe2fa')
      head_format.set_font_size(14)
      head_format.set_border(1)
      # 2.设置合并样式
      merge_format = workbook.add_format(title_format)
      merge_format.set_font_size(title_fontSize)
      merge_format.set_border(1)
      # 3.文本缩进
      cell_format = workbook.add_format()
      cell_format.set_align("right")
      cell_format.set_border(1)

      # 设置表列宽
      worksheet.set_column(0,0,5)
      worksheet.set_column('%s:%s'%(colStart,colEnd),colWidth)

      # 填写数据
      # 1.表题目
      worksheet.merge_range('%s%s:%s%s'%(colStart,title_row,colEnd,title_row),excel_title,merge_format)

      # 2.表头数据
      worksheet.write_row(startCol+str(startRow),head,head_format)
      # 3.表数据
      for i in range(0,rowLen):
        rowData = data[i]
        worksheet.write_row(startCol+str(startRow+1+i),rowData,cell_format)

      #########################图相关配置##############################################
      if(chartType !="null"):
        # 创建图
        chart = workbook.add_chart({'type':chartType})

        # 配置图系列
        chart.add_series({
          'name':'=%s!%s$%s'%(excel_title,xAxisColumn,startRow),
          'categories':'=%s!$%s$%s:$%s$%s'%(excel_title,yAxisColumn, startRow+1,yAxisColumn,yAxisdataLen+startRow),
          'values':'=%s!$%s$%s:$%s$%s,'%(excel_title,xAxisColumn, startRow+1,xAxisColumn,xAxisdataLen+startRow),
          'data_labels': {'percentage': True},
        })

        # 添加图标题和x轴y轴标题
        chart.set_title({'name':chartTitle})
        chart.set_x_axis({'name':xAxisNname}) 
        chart.set_y_axis({'name':yAxisNname})
        # 设置图样式
        chart.set_style(setStyle)
        # 将图插入表中
        worksheet.insert_chart(chartPos,chart,{'x_offset': x_offset, 'y_offset': y_offset})
      else:
        pass
      ##########################结束配置#############################################
      # 关闭表
      workbook.close()
      res = {"code":200,"msg":"excel创建成功"}
      return res
    # 文件创建错误
    except xlsxwriter.exceptions.FileCreateError as e:
      res = {"code":-1,"msg": e}
      return res
    # 文件过大
    except xlsxwriter.exceptions.FileSizeError as e:
      res = {"code":-2,"msg": e}
      return res
    # 图没有数据
    except xlsxwriter.exceptions.EmptyChartSeries as e:
      res = {"code":-3,"msg": e}
      return res
    # 无效表名
    except xlsxwriter.exceptions.InvalidWorksheetName as e:
      res = {"code":-4,"msg": e}
      return res
    # 发生错误
    except Exception as e:
      res = {"code":-5,"msg": e}
      return res
    break  




