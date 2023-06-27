numCount = 0;
var foundIndex = -1;
var txtFile= null;
contact = new Array();
readCookies();
var notFound = document.createElement("h4");
notFound.appendChild(document.createTextNode("Contact not found!"));
function toggleAddNum()
{
	if ((document.getElementById('newNumber').style.maxHeight == '0px')||(document.getElementById('newNumber').style.maxHeight == ''))
	{
		document.getElementById('newNumber').style.maxHeight = '500px';
	}
	else
	{
		document.getElementById('newNumber').style.maxHeight = '0px';
	}
}
function submitContact()
{
	if((document.getElementById("firstName").value.length > 0)&&(document.getElementById("lastName").value.length > 0)&&(document.getElementById("telNum").value.length > 0)&&(document.getElementById("email").value.length > 0))
	{
		document.getElementById("firstName").style.backgroundColor = "white";
		document.getElementById("lastName").style.backgroundColor = "white";
		document.getElementById("telNum").style.backgroundColor = "white";
		document.getElementById("email").style.backgroundColor = "white";
		var create = sortList();
		createListing(create);
		numCount++;
		clearText();
	}
	else
	{
		if (document.getElementById("firstName").value.length == 0)
		{
			document.getElementById("firstName").style.backgroundColor = "#FF9595";
		}
		else
		{
			document.getElementById("firstName").style.backgroundColor = "white";
		}
		if (document.getElementById("lastName").value.length == 0)
		{
			document.getElementById("lastName").style.backgroundColor = "#FF9595";
		}
		else
		{
			document.getElementById("lastName").style.backgroundColor = "white";
		}
		if (document.getElementById("telNum").value.length == 0)
		{
			document.getElementById("telNum").style.backgroundColor = "#FF9595";
		}
		else
		{
			document.getElementById("telNum").style.backgroundColor = "white";
		}
		if (document.getElementById("email").value.length == 0)
		{
			document.getElementById("email").style.backgroundColor = "#FF9595";
		}
		else
		{
			document.getElementById("email").style.backgroundColor = "white";
		}
	}
	updateCookies();
}
function clearText()
{
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("telNum").value = "";
	document.getElementById("email").value = "";
	document.getElementById("email").style.backgroundColor = "white";
	document.getElementById("firstName").style.backgroundColor = "white";
	document.getElementById("lastName").style.backgroundColor = "white";
	document.getElementById("telNum").style.backgroundColor = "white";
}
function createListing(create)
{
	var row = document.createElement("tr");
	row.setAttribute("id", "row"+create);
	var firstCol = document.createElement("td");
	var lastCol = document.createElement("td");
	var telCol = document.createElement("td");
	var emailCol = document.createElement("td");
	var editCol = document.createElement("td");
	var editButton = document.createElement("input");
	editButton.setAttribute("type", "button");
	editButton.setAttribute("class", "editButtons");
	editButton.setAttribute("onClick", "javascript: editContact(" + create + ");");
	editButton.setAttribute("value", "Edit");
	editButton.setAttribute("id", "edit" + create);
	var remButton = document.createElement("input");
	remButton.setAttribute("type", "button");
	remButton.setAttribute("class", "remButtons");
	remButton.setAttribute("onClick", "javascript: removeContact(" + create + ");");
	remButton.setAttribute("value", "Remove");
	remButton.setAttribute("id", "remove" + create);
	firstCol.appendChild(document.createTextNode(contact[create].firstName));
	lastCol.appendChild(document.createTextNode(contact[create].lastName));
	telCol.appendChild(document.createTextNode(contact[create].telNum));
	emailCol.appendChild(document.createTextNode(contact[create].email));
	editCol.appendChild(editButton);
	editCol.appendChild(remButton);
	row.appendChild(firstCol);
	row.appendChild(lastCol);
	row.appendChild(telCol);
	row.appendChild(emailCol);
	row.appendChild(editCol);
	if(contact[create+1] != undefined)
	{
		for(var i = contact.length - 2; i >= create; i--)
		{
			var editElem = document.getElementById("edit" + i);
			editElem.setAttribute( "onClick", "javascript: editContact(" + (i + 1) + ");" );
			var remElem = document.getElementById("remove" + i);
			remElem.setAttribute( "onClick", "javascript: removeContact(" + (i + 1) + ");" );
			document.getElementById("edit" + i).id = "edit" + (i + 1);
			document.getElementById("remove" + i).id = "remove" + (i + 1);
			document.getElementById("row" + i).id = "row" + (i + 1);
		}
		document.getElementById("numberList").insertBefore(row, document.getElementById("row" + (create + 1)));
	}
	else
	{
		document.getElementById("numberList").appendChild(row);
	}
}
function findName()
{
	document.getElementById("underSearch").innerHTML = ""
	if (document.getElementById("searchBox").value.length > 0)
	{
		for(var i = 0; i < contact.length; i++)
		{
			if (
			((contact[i].firstName.toLowerCase() + " " + contact[i].lastName.toLowerCase()).indexOf(document.getElementById("searchBox").value.toLowerCase()) != -1)||
			((contact[i].lastName.toLowerCase() + " " + contact[i].firstName.toLowerCase()).indexOf(document.getElementById("searchBox").value.toLowerCase()) != -1))
				{
					displayIndex(i);
				}
		}
		if (document.getElementById("underSearch").innerHTML.length < 1)
		{
			document.getElementById("underSearch").appendChild(notFound);
		}
	}
}
function displayIndex(i)
{
	var list = document.createElement("ul");
	var firstRow = document.createElement("li");
	var lastRow = document.createElement("li");
	var telRow = document.createElement("li");
	var emailRow = document.createElement("li");
	firstRow.appendChild(document.createTextNode("First Name: " + contact[i].firstName));
	lastRow.appendChild(document.createTextNode("Last Name: " + contact[i].lastName));
	telRow.appendChild(document.createTextNode("Phone Number: " + contact[i].telNum));
	emailRow.appendChild(document.createTextNode("Email: " + contact[i].email));
	list.appendChild(firstRow);
	list.appendChild(lastRow);
	list.appendChild(telRow);
	list.appendChild(emailRow);
	document.getElementById("underSearch").appendChild(list);
}
function editContact(editNum)
{
	document.getElementById('newNumber').style.maxHeight = '500px';
	document.getElementById("firstName").value = contact[editNum].firstName;
	document.getElementById("lastName").value = contact[editNum].lastName;
	document.getElementById("telNum").value = contact[editNum].telNum;
	document.getElementById("email").value = contact[editNum].email;
	removeContact(editNum);
}
function removeContact(removeNum)
{
	var child = document.getElementById("row"+removeNum);
	var par = document.getElementById("numberList");
	par.removeChild(child);
	contact.splice(removeNum,1);
	numCount--;
	fixRemove(removeNum);
	updateCookies();
}
function fixRemove(fixN)
{
	for (var i = 0; i+fixN < numCount; i++)
	{
		var editElem = document.getElementById("edit" + (fixN + i + 1));
		editElem.setAttribute( "onClick", "javascript: editContact(" + (fixN + i) + ");" );
		var remElem = document.getElementById("remove" + (fixN + i + 1));
		remElem.setAttribute( "onClick", "javascript: removeContact(" + (fixN + i) + ");" );
		document.getElementById("edit" + (fixN + i + 1)).id = "edit" + (fixN + i);
		document.getElementById("remove" + (fixN + i + 1)).id = "remove" + (fixN + i);
		document.getElementById("row" + (fixN + i + 1)).id = "row" + (fixN + i);
	}
}
function fixInsert(fixN)
{
	contact.splice(fixN, 0, {firstName:document.getElementById("firstName").value,		lastName:document.getElementById("lastName").value,telNum:document.getElementById("telNum").value,email:document.getElementById("email").value});
}
function sortList()
{
	var index = 0;
	if (numCount == 0)
	{
		fixInsert(index);
		return index;
	}
	else
	{
		while((index<numCount) && ((document.getElementById('firstName').value + " " + document.getElementById('lastName').value).localeCompare(contact[index].firstName + " " + contact[index].lastName) > -1))
		{
			index++;
		}
	}
	fixInsert(index);
	return index;
}
function updateCookies()
{
	//Updates numCount and Contact cookies
	setCookie("numCount", numCount,365);
	for (var i = 0; i<numCount;i++)
	{
		setCookie("contact" + i, (contact[i].firstName + "~%~" + contact[i].lastName + "~#~" + contact[i].telNum + "~@~" + contact[i].email),365);
	}
	setCookie("contact" + numCount, "",0);
}
function setCookie(cname, cvalue, exdays)
{
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ')
			c = c.substring(1);
        if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
    }
	if (cname == numCount)
	{
		return 0;
	}
    return "";
}
function readCookies()
{
	numCount = parseInt(getCookie("numCount"));
	var cookie = null;
	for (var i = 0; i < numCount ;i++)
	{
		cookie = getCookie("contact" + i);
		name = cookie.replace(/(?=~%~).+/, "");
		last = cookie.match(/%~(.+)(?=~#)/)[0].substring(2);
		tel = cookie.match(/#~(.+)(?=~@)/)[0].substring(2);
		mail = cookie.match(/@~(.+)/)[0].substring(2);
		contact[i] = {firstName:name,lastName:last,telNum:tel,email:mail};
		createListing(i);
	}
}
function clearCookies()
{
	setCookie("numCount", "", 0);
	for (var i = 0; i< numCount; i++)
	{
		setCookie("contact" + i, "", 0);
	}
}