package com.so_cili.dhtcrawler.structure;

import java.util.HashSet;
import java.util.Iterator;

public class Queue<E> extends HashSet<E>
{

	private static final long serialVersionUID = 1L;
	private int waitingThreads = 0;
	
	@Override
	public synchronized int size() {
		return super.size();
	}

	public synchronized void insert(E e)
	{
		add(e);
		notify();
	}

	public synchronized E remove()
	{
		if ( isEmpty() ) {
			try	{ 
				waitingThreads++;
				wait();
			} catch (InterruptedException e){
				Thread.interrupted();
			}
			waitingThreads--;
		}
		Iterator<E> it = this.iterator();
		E next = it.next();
		it.remove();
		return next;
	}

	public boolean isEmpty() {
		return 	(size() - waitingThreads <= 0);
	}
}
