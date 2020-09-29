def getSum(a,b):
  return "a+b:%s"%(a+b)

def catchSum():
  a = 1
  b = 2
  res = getSum(a,b)
  e ="error"
  resDic = {"res":res,"msg":e}
  return resDic

if __name__ == "__main__":
  result =  catchSum()
  print(result)