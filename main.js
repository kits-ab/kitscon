
function getStringWidth(str) {

  var span = document.createElement("span");
  span.innerText = str;
  span.style.visibility = "hidden";

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(span);
  var textWidth = span.offsetWidth;
  body.removeChild(span);
  //console.log(textWidth);
  return textWidth;
}

function getAnimationRule(animationName) {
  var KEYFRAME_RULE = window.CSSRule.WEBKIT_KEYFRAMES_RULE ||
      window.CSSRule.MOZ_KEYFRAMES_RULE ||
      window.CSSRule.KEYFRAMES_RULE;

  var stylesheets = document.styleSheets;
  for (var i = 0 ; i < stylesheets.length ; i++) {
      var rules = stylesheets[i].cssRules;
      for (var j = 0 ; j < rules.length ; j++) {
          var rule = rules[j];
          if (rule.type == KEYFRAME_RULE && rule.name == "marquee") {
              return rule;
          }
      }
  }
}

function updateMarqueeAmplitude(element) {

  var animationName = "marquee";
  var marqueeRule = getAnimationRule(animationName);
  //console.log(marqueeRule);
  if (null == marqueeRule) {
      return;
  }

  // remove the old animation (if any)
  element.style.webkitAnimationName = "none";

  var textWidth = getStringWidth(element.innerText);
  //console.log(textWidth);

  // update the values of our keyframe animation
  marqueeRule.deleteRule("0%");
  marqueeRule.deleteRule("100%");
  marqueeRule.appendRule('0% { text-indent: ' + element.offsetWidth + 'px; }');
  marqueeRule.appendRule('100% { text-indent: ' + -textWidth + 'px; }');

  // re-assign the animation (to make it run)
  element.style.webkitAnimationName = animationName;
}
//console.log(document.querySelector(".marquee"));
updateMarqueeAmplitude(document.querySelector(".marquee"));
