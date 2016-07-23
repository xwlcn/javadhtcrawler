package com.so_cili.dhtcrawler.structure;

import java.util.HashSet;

public class Queue<E> extends HashSet<E>
{

	private static final long serialVersionUID = 1L;
	private int waitingThreads = 0;

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
		E next = iterator().next();
		remove(next);
		return next;
	}

	public boolean isEmpty() {
		return 	(size() - waitingThreads <= 0);
	}
}
