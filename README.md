# Young Innovations Internship Challenge via Petroleum Report

A project as a part of internship challenge provided by young innovations which includes a report showing min, max and average Sale of each Petroleum Product for 5 years interval extracted using an API call from the data.json file provided.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

First clone or fork the repo
```
git clone https://smilerac@bitbucket.org/smilerac/yipl-intern-petroleum-report.git
```
If you prefer ssh
```
git clone git@bitbucket.org:smilerac/yipl-intern-petroleum-report.git
```

### Prerequisites

What things you need to install the software and how to install them
(for python3)

```
pip3 install pandas 
pip3 install numpy 
pip3 install prettytable 
pip3 install requests
pip3 install json
pip3 install sqlite3
```

### Installing

To run the python program just find the petroleum_sales.py file then:

Run the file (through terminal)
```
python3 petroleum_sales.py
```

You will get something like this
```
Final Report
+------------------------+-----------+----------+--------------------+----------+
|   petroleum_product    |    Year   |   amin   |        mean        |   amax   |
+------------------------+-----------+----------+--------------------+----------+
| Aviation Turbine Fuel  | 2000-2004 | 47453.0  | 59770.666666666664 | 66825.0  |
| Aviation Turbine Fuel  | 2005-2009 | 63778.0  |      77119.2       | 101314.0 |
| Aviation Turbine Fuel  | 2010-2014 | 109808.0 |     122131.25      | 139404.0 |
|         Diesel         | 2000-2004 | 286233.0 |      303615.5      | 326060.0 |
|         Diesel         | 2005-2009 | 302706.0 |      464698.8      | 655128.0 |
|         Diesel         | 2010-2014 | 648513.0 |     769438.25      | 901393.0 |
|      Furnace Oil       | 2000-2004 |  2696.0  |      12121.5       | 20934.0  |
|      Furnace Oil       | 2005-2009 |  1415.0  |       2730.4       |  4558.0  |
|      Furnace Oil       | 2010-2014 |  435.0   |       1442.5       |  2450.0  |
|        Kerosene        | 2000-2004 | 226637.0 | 304730.6666666667  | 386592.0 |
|        Kerosene        | 2005-2009 | 49495.0  |      105687.6      | 197850.0 |
|        Kerosene        | 2010-2014 | 18628.0  |      26055.25      | 41808.0  |
|       LPG in MT        | 2000-2004 | 40102.0  | 61613.166666666664 | 81005.0  |
|       LPG in MT        | 2005-2009 | 93562.0  |      121333.8      | 159286.0 |
|       LPG in MT        | 2010-2014 | 181411.0 |      219852.0      | 258299.0 |
|    Light Diesel Oil    | 2000-2004 |   88.0   | 1232.3333333333333 |  3416.0  |
|    Light Diesel Oil    | 2005-2009 |  179.0   |       265.4        |  377.0   |
|    Light Diesel Oil    | 2010-2014 |  258.0   |       258.0        |  258.0   |
| Mineral Turpentine Oil | 2000-2004 |   36.0   |        84.0        |  132.0   |
| Mineral Turpentine Oil | 2005-2009 |   0.0    |        0.0         |   0.0    |
| Mineral Turpentine Oil | 2010-2014 |   0.0    |        0.0         |   0.0    |
|         Petrol         | 2000-2004 | 59245.0  |      69089.5       | 80989.0  |
|         Petrol         | 2005-2009 | 100842.0 |      135367.8      | 187641.0 |
|         Petrol         | 2010-2014 | 199749.0 |     239110.75      | 283567.0 |
+------------------------+-----------+----------+--------------------+----------+
```

## Built With

* [Python3](https://docs.python.org/3/) - IDE
* [SQLite](https://docs.python.org/2/library/sqlite3.html) - Database


## Authors

* **Rachita Maharjan** - *Initial work* - [smilerac](https://bitbucket.org/smilerac)

See also the list of [contributors](https://bitbucket.org/smilerac/yipl-intern-petroleum-report/admin/access) who participated in this project.
