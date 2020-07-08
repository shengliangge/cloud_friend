package com.queue;

import java.util.Scanner;

public class ArrayQueue {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
	}
}

class ArrQueue {
	private int maxSize;// 队列最大容量
	private int frant;// 队列头
	private int rear;// 队列尾
	private int[] arr;// 存储数据

	public ArrQueue(int size) {
		this.maxSize = size;// 获取最大容量
		this.frant = -1;// 指向队列头（队列头的前一个）
		this.rear = -1;// 指向队列尾（队列尾的前一个）
	}

	// 判断是否满
	public Boolean isFull() {
		return rear == maxSize - 1;
	}

	// 判断是否为空
	public Boolean isEmpty() {
		return frant == rear;
	}

	// 插入一个数据
	public void addQueue(int num) {
		// 先判断是否满
		if (isFull()) {
			System.out.println("队列满");
		}
		arr[++frant] = num;
	}

	// 取出一个数据
	public int getQueue() {
		// 先判断是否为空
		if (isEmpty()) {
			throw new RuntimeException("队列为空");
		}
		return arr[++rear];
	}

	// 显示队列所有数据
	public void showQueue() {
		if (isEmpty()) {
			System.out.println("队列为空，没有数据");
		}
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);
		}
	}

	public int headQueue() {
		if (isEmpty()) {
			throw new RuntimeException("队列为空");
		}
		return arr[frant + 1];
	}
}
