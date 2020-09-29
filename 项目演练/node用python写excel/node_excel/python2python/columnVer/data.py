from getExcel_column import createXls
data_column = [
  ["bar","图标题","x轴标题","y轴标题"],
  [0,1],
  ["Number","Batch1","Batch2","Batch3","Batch4"],
  ["apple", "pear", "banana", "peach", "mango"],
  [0, 1, 2, 3, 4],
  [2, 4, 6, 8, 10],
  [3, 6, 9, 12, 15],
  [5 , 12, 54, 22,11]
]
createXls(data_column)
