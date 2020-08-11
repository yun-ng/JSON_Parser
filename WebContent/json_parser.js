// Read JSON data from current directory
var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
request.open("GET", "./data.json", false);

request.onreadystatechange = function() {
	
	// Proceed only if JSON file exists
	if ( request.readyState === 4 && request.status === 200 ) {
		var json_object = JSON.parse(request.responseText);
		var recipients = json_object.recipients;
		
		//Display alert on total numbers of recipients
		alert(recipients.length);
			
			//Declare master array to keep all unique matching recipients pairs
			var matching_recipients_pair = [];
			
			//Loop through all recipients and get their tags
			for (var i = 0; i < recipients.length; i++) {
				var recipient = recipients[i];
				var recipient_tags = recipient.tags;
				
				//If recipient has zero or less than 1 tag, skip
				if (recipient.tags.length <= 1){
					continue;
				}
				
				//Loop through all subjects in recipients	
				for (var j=0; j < recipients.length; j++){
					var subject = recipients[j];
					
					//Only compare if recipient different from subject
					if (j!=i){
						var subject_tags = subject.tags;
						
						//Reconstruct a new matching tag array to determine how many matching tags between recipient & subject
						var matching_tags = recipient_tags.filter(tag => subject_tags.includes(tag));
						
						//If there are more than 2 matching tags, save into results
						if (matching_tags.length >= 2){
							
							var pair = [recipient.name, subject.name];
							
							//Sort name pairs
							pair.sort();							
							
							var pair_name = pair[0] + "-" + pair[1];	
													
							//Only push if pair not exist							
							if (matching_recipients_pair.indexOf(pair_name) == -1)
								matching_recipients_pair.push(pair_name);
														
						}
						
						
					}
				}
			}
			
			//Display name pairs in console
			for (var k=0; k < matching_recipients_pair.length; k++){
				var pair_name = matching_recipients_pair[k];
				console.log(pair_name);
			}

  }
}
request.send(null);