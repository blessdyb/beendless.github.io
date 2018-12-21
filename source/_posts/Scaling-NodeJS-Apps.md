---
title: Scaling NodeJS Apps -- The Need to Scale
date: 2018-12-20 01:26:16
categories: CS
tags:
	- DevOps
	- NodeJS
---

This is the notes when I read the book [Scaling Your Nodej.js Apps](https://www.apress.com/de/book/9781484239902).

An increasing in incoming traffic could affect your system in different ways; we can describe these as direct or indirect.

* Direct Effects

	Overloading your server's capacity to handle incoming traffic is the most obivous direct effects.
	* Apache Httpd spawns a new process for every request, so multiple concurrent requests might cause this scenario to get out of hand quickly.
	* Nginx has a non-blocking I/O approach, so it's capable of managing high levels of traffic with constant memory consumption.
	
* Indirect Effects

	An increasing in traffic can affect your application indirectly by overloading one of your internal processes. In a microservices-based architecture, the communication between services needs to be carefully planned. The fact that your're capable of handling the increased traffic on your user-facing service doesn't mean the rest of your architecture will be able to handle it. Whenever you depend on third-party services, they can actually assure you that their service will not be degraded by anything.
	
* High Availability

	It must ensure that whatever service it provides will always be available and will not lose performance, despite having internal problems. The availability of a system is known as it's `uptime` or `SLA`(Service Level Agreement) which is measured in nines of availability.
	A common way to approach the high HA is to use master/slave design for each node. The monitor service will guarantee that all our nodes are working well. If one of the nodes fails, its slave node would be promoted as the new master node and replace the bad one. It works good if you can simply exchange the master node with slave node without any loss of data or any kind of information. For database nodes, we have to introduce the passive data replication process between maseter nodes and slave nodes. It can make sure at any point if your master gets lot, the slave will take over the responsibility with minimal side-effects (data lose). One thing you need to keep in mind that you can't prevent the master node goes down during the mid-write process, so we need to enable the data transaction
	
	* Redis with sentinel enabled, the slaves are not just there waiting to be promoted, they are used for read-only queries as well. So the slaves will take care of all the write operations.
	* MongoDB has replica sets. It allows us to set a group of nodes with one of them as the primary node 	


* Fault Tolerance
	
	High availability is all about keeping the offline time of your platform to a minimum and always trying to keep performance unaffected. The most important difference between these two is that if an error occurs during an action, a high available system does not ensure the correct end state of that action, while a fault-tolerant one does. This distinction is crucial because it will be the key to understanding which approach you will want to implement for your particular use case.
	
	Usually fault-tolerant systems try to catch the error at its source and find a solution before it becomes critical. 
	
	* Redundancy

		We have one or more components performing the same task and some form of checking logic to determine when one of them is has failed and its output needs to be ignored. It's a very common practice for mission-critical components.
		
		* Triple Modular Redundancy
			`TMR` is a form of redundancy in which three systems perform the same process and their results are checked by a majority voting system that in turn produces a single output.
		
		* Forward Error Correction
			`FEC` adds redundancy into the message itself. The receiver can verify the actual data and correct a limited number of detected errors caused by noisy or unstable channels. 

	* Checkingpoint
		
		This technique consists of saving the current state of the system into reliable storage and restarting the system by preloading that saved state whenever there is a problem.
		
		For distributed system, when one of nodes recovers from a checkingpoint, the other nodes need to ensure that their current state is consistant. This is a bit complex because there is usually a dependency between nodes, so the solution here is to force the system to return to the only common stable state: its original checkpoint.

	
