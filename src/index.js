/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Cat Facts for a cat fact"
 *  Alexa: "Here's your cat fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.6f97ae95-04de-4dbb-b5e4-42c967543876";

/**
 * Array containing cat facts.
 */
var CAT_FACTS = [
    "Cats sleep for an average of 13 to 14 hours a day. That means a nine-year-old cat has been awake for only three years of its life.",
    "There are 36 species of cats.",
    "The technical term for a cat's hairball is a bezoar.",
    "A group of cats is called a clowder.",
    "Female cats tend to be right pawed, while male cats are more often left pawed.",
    "A cat usually has about 12 whiskers on each side of its face.",
    "A cat almost never meows at another cat, mostly just humans. Cats typically will spit, purr, and hiss at other cats.",
    "Cats have nearly 30 individual bones in their tails and use them for balance.",
    "There are about 100 distinct breeds of domestic cat.",
    "Calico and tortiseshell cats are almost always female because the genes for the coloring are on the X chromosome.",
    "Cats can't taste sweet things.",
    "The cheetah is the only cat in the world that can't retract it's claws.",
    "A cat has 32 muscles in each ear.",
    "Cats have a third eyelid called a haw.",
    "A cat sees about six times better than a human at night because of the tapetum lucidum, a layer of extra reflecting cells which absorb light.",
    "A cat cannot see directly under its nose. This is why the cat cannot seem to find tidbits on the floor.",
    "Siamese kittens are born white.",
    "Cats spend a third of their waking hours cleaning themselves.",
    "Famous cat people include: Taylor Swift, Albert Einstein, and Marie Antoinette.",
    "Feral cats live in colonies.",
    "Cats don't purr just because they're happy. Cats also purr when they are frightened or threatened.",
    "Cats have been domesticated for almost 4000 years.",
    "The Siberian Tiger is the biggest wild cat. They weight up to 700 pounds.",
    "The Singapura is the smallest domestic cat breed. They weigh only 5 to 8 pounds.",
    "Cats have 230 bones. Humans only have 203.",
    "Cats have barbs on their tongue for tearing flesh.",
    "Cats can rotate their ears 180 degrees.",
    "A cat's sense of smell is 14 times better than a human's.",
    "Only about 50 percent of cats react to catnip.",
    "White cats with blue eyes are more likely to be deaf.",
    "Wild cats rarely drink water because they get most of their water from their prey.",
    "Cats were first introduced to the Americas in 1498 on the Santo Domingo.",
    "Tokyo has about 60 cat cafes."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CatFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CatFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CatFacts.prototype = Object.create(AlexaSkill.prototype);
CatFacts.prototype.constructor = CatFacts;

CatFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("CatFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CatFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CatFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
CatFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("CatFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CatFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Cat Facts tell me a cat fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random cat fact from the cat facts list
    var factIndex = Math.floor(Math.random() * CAT_FACTS.length);
    var fact = CAT_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Cat fact! " + fact;

    response.tellWithCard(speechOutput, "CatFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CatFacts skill.
    var catFacts = new CatFacts();
    catFacts.execute(event, context);
};

