package com.stack;
//链表实现栈
public class LinkedStack {
    public static void main(String[] args) {

    }
}

class Linked{
    private int value;
    private Linked top=null;
    private Linked next;
    public boolean isEmpty(){
        return top==null;
    }
    public void push(int val){
        top.value=val;
    }
}
