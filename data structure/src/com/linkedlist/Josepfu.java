package com.linkedlist;

public class Josepfu {
    public static void main(String[] args) {
        CircleSingleLinkedList list = new CircleSingleLinkedList();
        list.addBoy(25);
        list.show();
        list.countBoy(1,2,25);
    }
}

class CircleSingleLinkedList {
    // 创建一个first节点，当前没有编号
    private Boy first = null;

    //约瑟夫问题
    public void countBoy(int startNo, int countNum, int nums) {
        if (first == null || startNo < 1 || startNo > nums) {
            System.out.println("参数输入有错误，请重新输入");
            return;
        }
        Boy helper = first;
        while (helper.getNext() != first) {
            helper = helper.getNext();
        }
        for (int i = 0; i < startNo - 1; i++) {
            helper = helper.getNext();
        }
        first = helper.getNext();
        while (true) {
            if (helper == first) {//只剩一个节点
                break;
            }
            for(int i=0;i<countNum-1;i++){
                helper=helper.getNext();
            }
            first=helper.getNext();
            System.out.println("取出"+first.getNo());
            first=first.getNext();
            helper.setNext(first);
        }
        System.out.println("最后剩"+first.getNo());
    }

    // 添加节点，构建一个环形链表
    public void addBoy(int nums) {
        // nums做数据校验
        if (nums < 1) {
            System.out.println("nums的数值不正确");
            return;
        }
        Boy curBoy = null;// 辅助指针
        // 使用for来创建环形链表
        for (int i = 1; i <= nums; i++) {
            Boy boy = new Boy(i);
            // 如果是第一个节点
            if (i == 1) {
                first = boy;
                first.setNext(first);// 只有一个，自己指向自己，形成环形
                curBoy = first;
            } else {
                curBoy.setNext(boy);
                boy.setNext(first);
                curBoy = boy;
            }
        }
    }

    // 遍历当前环形链表
    public void show() {
        // 判断是否为空
        if (first == null) {
            System.out.println("链表为空");
            return;
        }
        Boy temp = first;
        while (true) {
            System.out.println("我是第" + temp.getNo() + "个节点");
            if (temp.getNext() == first) {
                break;
            }
            temp = temp.getNext();
        }
    }

}

class Boy {
    private int no;// 编号
    private Boy next;// 指向下一个节点,默认为null

    public Boy(int no) {
        this.no = no;
    }

    public Boy getNext() {
        return next;
    }

    public void setNext(Boy next) {
        this.next = next;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }
}


