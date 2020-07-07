package com.stack;

public class ArrayStackDemo {
    public static void main(String[] args) {
        //测试
        ArrayStack stack = new ArrayStack(4);
        stack.push(5);
        stack.push(3);
        stack.push(7);
        stack.push(6);
        stack.push(9);
        System.out.println(stack.pop());
        System.out.println("打印");
        stack.list();
    }
}

class ArrayStack {
    private int maxSize;
    private int[] stack;
    private int top = -1;

    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[this.maxSize];
    }

    //判断栈是否满，如果top>=maxSize的时候，栈满
    public boolean isFull() {
        return top >= maxSize - 1;
    }

    //判断栈是否空，如果top=-1，栈空
    public boolean isEmpty() {
        return top == -1;
    }

    //进栈
    public void push(int value) {
        //判断是否满
        if (isFull()) {
            System.out.println("栈满");
            return;
        }
        stack[++top] = value;
    }

    //出栈
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("栈空");
        }
        return stack[top--];
    }

    //遍历
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.println(stack[i]);
        }
    }
}