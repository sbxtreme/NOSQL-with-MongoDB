//*************** database-->collections(tables in RDBMS)-->documents(rows in RDBMS) ******************

// list current database
db

// create or switch database
use database1
use database2

// show databases
show dbs // the newly created databases are not show because there is no documents in it.

// command to insert document ( the document is in JSON format i.e key-value pairs )
db.mycollection.insert({
	"name": "Shobhit",
	"age": 26,
	"address": {
		"street": "MGROAD",
		"city": "Gurgaon",
		"state": "Haryana",
		"pin": 122001
	},
	"organization": "ITC",
	"technology": ["Mongodb", "Machine Learning", "Python", "SQL", "Informatica"]
}
)

// inserting document in database2
use database2
db.mycollection.insert({
	"name": "Shobhit",
	"age": 26,
	"address": {
		"street": "MGROAD",
		"city": "Gurgaon",
		"state": "Haryana",
		"pin": 122001
	},
	"organization": "ITC",
	"technology": ["Mongodb", "Machine Learning", "Python", "SQL", "Informatica"]
}
)

// command to drop database. The below command will drop the current database in which the user is switched in.
db.dropDatabase()

// command to create collections in database
db.createCollection("mycollection_1")
db.createCollection("mycollection_2")
// command to see collections present in a database
show collections
// command to drop collections -- db.<collection_name>.drop()
db.mycollection_2.drop()

// insert bulk in collections ( creating collection named student and inserting records in the form of JSON document.)

db.students.insert
(
[
		{
			"name":"shobhit",
			"class":10,
			"skills":"db",
		},
		{
			"name":"mark",
			"class":10,
			"skills":"db2",
		},
		{
			"name":"paul",
			"class":10,
			"skills":"db2",
		},
		{
			"name":"henry",
			"class":11,
			"skills":"db",
		},
		{
			"name":"alok",
			"class":12,
			"skills":"nosqldb",
		},
		{
			"name":"shobhit",
			"class":10,
			"skills":"nosqldb",
		}
]
)


// command to query the collection inside the database to get documents.
db.mycollection.find()
db.students.find()
db.students.findOne() // will show 1st document from collection students
db.students.find({"name":"alok"}) // where name = 'alok'
db.students.find({"class":10}) // where class=10
db.students.find      // will show class greater than 10
(
	{
		"class": {$gt : 10}
	}
)

db.students.find // will show class greater than or equal to 11
(
	{
		"class": {$gte : 11}
	}
)

db.students.find // will show class less than or equal to 11
(
	{
		"class":{$lte : 11}
	}
)

db.students.find
(
	{
		"class":{$ne :10}
	}
)

// the below command uses AND condition in a collection to get documents
db.students.find({"class":10,"skills":"db"}) // here , is used as AND condition

// the below command uses OR condition in a collection to get documents
db.students.find
(
	{
		$or : [{"name":"shobhit"},{"class":12}]
	}
)


// the below command uses AND and OR conditions
db.students.find
(
{
  "name":"shobhit" , $or : [{"class":10},{"skills":"db"}]
}
)


// command to update the documents inside collections
db.students.update
(
	{"name":"shobhit"},  // condition on which update will run
	{$set:{"skills":"Mongodb"}}, // key's value which needs to be updated
	{multi:true} // if there are multiple documents which needs to be updated in 1 go then use multi:true (by default mongo will only update 1st row)
)


// command to update / insert data using json (document) supplied to the command
db.students.save    // save method is used to update / insert document based on id present in collection
(
	{ 
		"_id" : ObjectId("5a26b783ec58bcc914a0cae1"),   // if this id is not present in collection then it will insert else it will update
		"name" : "Johny", 
		"class" : 10.0, 
		"skills" : "Mongod"
	}
)


// command to delete documents from a collection
db.students.remove()  // the command will delete all the documents from collection , so be careful with this command.
db.students.remove({"name" : "shobhit"}) // here we give condition based on which the documents will be deleted/removed from collection
db.students.remove({"name" : "shobhit"},1) // if 2 documents satisfies the conditions then passing 1 will delete only 1 document
// OR and AND conditions can be used to remove the documents 
db.students.remove
(
	{
		$or : [{"skills":"db"},{"skills":"db2"}]
	}
)

// Projection in Mongodb i.e selecting only the specific data attribute(columns) from all the documents(records) present in a collection(table)
db.students.find({},{"name":1}) // it will show only name attribute and hide all others
db.students.find({},{"name":0}) // it will hide name attributes and will show all others
// by default _id is always shown while executing the above command so we need to explicitly disable it. To do so we use the below command
db.students.find({},{"name":1,"_id":0}) // it will only show name -- no id along with name

// Limit, skip and sort operations on documents in a collection.
db.students.find().skip(2) // this will skip first 2 records and will show last 4 records
db.students.find().limit(4) // this will show 1st 4 rocords and skip last 2 records
db.students.find().sort({"name":-1}) // this will sort the documents based on name attribute in decending order
db.students.find().sort({"name":1}) // this will sort the documents based on name attribute in ascending order

// command to create index
//-- the below command creates documents using loop --
for (i=0;i<1000000;++i)
{
	db.largecoll.insert({"sid":i,"subject":"maths"})
}
// the below command creates index on sid in the documents
db.largecoll.ensureIndex({"sid":1})
// the below command is to drop index
db.largecoll.dropIndex({"sid":1})


// commands to use aggrigation function based on grouping in documents
db.stu.aggregate
(
	[
		{$group:{_id:"$gender",result:{$sum:1}}}
	]
)
db.stu.aggregate
(
	[
		{$group:{_id:"$gender",result:{$max:"$class"}}}
	]
)
db.stu.aggregate
(
	[
		{$group:{_id:"$gender",result:{$min:"$class"}}}
	]
)
