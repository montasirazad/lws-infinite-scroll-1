const circle = document.getElementById("circle");

const observer = new IntersectionObserver((items) => {
  const trackingInfo = items[0];
  if (trackingInfo.isIntersecting) {
    console.log("circle is visible");
  } else {
    console.log("circle is not visible");
  }
});

observer.observe(circle);