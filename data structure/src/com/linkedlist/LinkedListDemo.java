package com.linkedlist;

import java.util.Stack;

public class LinkedListDemo {
	public static void main(String[] args) {

		HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
		HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
		HeroNode hero3 = new HeroNode(3, "林冲", "及豹子头");
		HeroNode hero4 = new HeroNode(4, "鲁智深", "花和尚");
		SinleHeroList sinle = new SinleHeroList();
		// 使用排序插入
		sinle.addByOrder(hero2);
		sinle.addByOrder(hero3);
		sinle.addByOrder(hero1);
		sinle.addByOrder(hero4);
		sinle.list();
		System.out.println("反转");
		reversePrint(SinleHeroList.getHead());
		// HeroNode reverse = reverse(SinleHeroList.getHead());
		// System.out.println(reverse(SinleHeroList.getHead()));
		// reverse(SinleHeroList.getHead());
		// sinle.list();
		// System.out.println("后");
		// System.out.println(indexNode(SinleHeroList.getHead(), 6));
		// System.out.println(getLength(SinleHeroList.getHead()));
		// sinle.delete(1);
		// sinle.list();
	}

	public static void reversePrint(HeroNode head) {
		if (head.next == null) {
			// 链表为空，不打印
			return;
		}
		Stack<HeroNode> stack = new Stack<HeroNode>();
		HeroNode cur = head.next;
		while (cur != null) {
			stack.push(cur);
			cur = cur.next;
		}
		while (stack.size() > 0) {
			System.out.println(stack.pop());
		}
		return;
	}

	public static void reverse(HeroNode head) {
		if (head.next == null || head.next.next == null) {
			return;
		}
		HeroNode cur = head.next;
		HeroNode next = null;
		HeroNode reverseNode = new HeroNode(0, "", "");
		while (cur != null) {
			next = cur.next;
			cur.next = reverseNode.next;
			reverseNode.next = cur;
			cur = next;
		}
		head.next = reverseNode.next;
	}

	// 获取链表倒数第k个元素
	public static HeroNode indexNode(HeroNode head, int index) {
		if (head.next == null) {
			System.out.println("链表空");
			return null;
		}
		int length = getLength(head);
		HeroNode cur = head.next;
		if (index <= 0 || index > length) {
			System.out.println("越界");
			return null;
		}
		for (int i = 0; i < length - index; i++) {
			cur = cur.next;
		}
		return cur;
	}

	public static int getLength(HeroNode head) {
		if (head.next == null) {
			return 0;
		}
		HeroNode cur = head.next;
		int length = 0;
		while (cur != null) {
			length++;
			cur = cur.next;
		}
		return length;
	}

	public static class SinleHeroList {
		// 定义头结点
		private static HeroNode head = new HeroNode(0, "", "");

		public static HeroNode getHead() {
			return head;
		}

		// 加入节点放到链表最后
		public void add(HeroNode node) {
			HeroNode temp = head;
			while (true) {// 死循环遍历
				if (temp.next == null) {
					break;
				}
				temp = temp.next;
			}
			// while循环结束后，temp为链表最后一个
			temp.next = node;
		}

		public void addByOrder(HeroNode node) {
			HeroNode temp = head;
			boolean flag = false;
			while (true) { // 死循环用于寻找node适合插入的地方，找到就停止循环
				if (temp.next == null) { // 说明temp（即头节点）已经是最后一个
					break;
				}
				if (temp.next.no > node.no) {// 说明插入的节点应该插在temp和temp.next之间
					break;
				} else if (temp.next.no == node.no) {
					// 编号冲突
					flag = true;
					break;
				}
				temp = temp.next;// 没找到，跳到下一个
			}
			// 循环结束，判断flag的状态，决定是否插入
			if (flag) { // 编号存在
				System.out.println(node.no + "编号已经存在");
			} else {
				node.next = temp.next;
				temp.next = node;
			}
		}

		public void delete(int no) {
			HeroNode temp = head;
			while (true) {
				if (temp.next == null) {
					System.out.println("链表空");
					break;
				}
				if (temp.next.no == no) {
					temp.next = temp.next.next;
					break;
				}
				temp = temp.next;
			}
		}

		// 遍历
		public void list() {
			HeroNode temp = head;
			if (temp.next == null) {
				System.out.println("链表空");
				return;
			}
			while (true) {
				System.out.println(temp.next);
				temp = temp.next;
				if (temp.next == null) {
					return;
				}
			}

		}

	}

	public static class HeroNode {
		public int no;
		public String name;
		public String nickname;
		public HeroNode next;

		public HeroNode(int no, String name, String nickname) {
			this.no = no;
			this.name = name;
			this.nickname = nickname;
		}

		@Override
		public String toString() {
			return "HeroList [no=" + no + ", name=" + name + ", nickname=" + nickname + "]";
		}

	}
}
