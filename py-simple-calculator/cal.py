# A python simple calculator using basic operators like +, -, *, /
operator = input("Enter an operator (+ - * /): ")
num1 = float(input("Enter your first number: "))
num2 = float(input("Enter your second number: "))

if operator == "+":
    result = num1 + num2
    print(round(result, 3))

elif operator == "-":
    result = num1 - num2
    print(round(result, 3))

elif operator == "*":
    result = num1 * num2
    print(round(result, 3))

elif operator == "/":
    result = num1 / num2
    print(round(result, 3))

else:
    print(f"The {operator} you entered is not valid!")