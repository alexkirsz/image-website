import React from "react";

const RED = "#f50057";
const GREEN = "#64dd17";
const BLUE = "#00b0ff";
const YELLOW = "#ffea00";
const CYAN = "#84ffff";
const MAGENTA = "#ea80fc";

const TRIANGLE =
  "M93.49,75C100.41,63,64.05,0,50.2,0S0,63,6.91,75,86.56,87,93.49,75Z";

function Triangle(props: React.SVGProps<SVGPathElement>) {
  return <path d={TRIANGLE} {...props} />;
}

function TriangleAnimation({
  duration,
  startAngle,
  angleDelta,
  revert = false,
  ...otherProps
}: {
  duration: number;
  startAngle: number;
  angleDelta: number;
  revert?: boolean;
} & React.SVGProps<SVGElement>) {
  let key1 = startAngle - angleDelta;
  let key2 = startAngle + angleDelta;

  if (revert) {
    [key1, key2] = [key2, key1];
  }

  const keyframes = [
    [startAngle, 0],
    [key1, 0.25],
    [key2, 0.75],
    [startAngle, 1]
  ];

  const easings = [
    // ease-out
    [0.0, 0.0, 0.58, 1.0],
    // ease-in-out
    [0.42, 0.0, 0.58, 1.0],
    // ease-in
    [0.42, 0.0, 1.0, 1.0]
  ];

  return (
    <animateTransform
      attributeName="transform"
      dur={`${duration.toFixed(5)}s`}
      type="rotate"
      repeatCount="indefinite"
      calcMode="spline"
      values={keyframes.map(key => `${key[0].toFixed(5)} 50 50`).join("; ")}
      keyTimes={keyframes.map(key => key[1].toFixed(5)).join(";")}
      keySplines={easings
        .map(easing => easing.map(v => v.toFixed(5)).join(" "))
        .join("; ")}
      {...otherProps}
    />
  );
}

function RedTriangleAnimation() {
  return <TriangleAnimation duration={37} startAngle={-40} angleDelta={10} />;
}

function GreenTriangleAnimation() {
  return (
    <TriangleAnimation duration={41} startAngle={0} angleDelta={10} revert />
  );
}

function BlueTriangleAnimation() {
  return <TriangleAnimation duration={43} startAngle={40} angleDelta={10} />;
}

export default function AnimatedLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
      <defs>
        <Triangle id="triangle" />

        <Triangle id="red">
          <RedTriangleAnimation />
        </Triangle>

        <Triangle id="green">
          <GreenTriangleAnimation />
        </Triangle>

        <Triangle id="blue">
          <BlueTriangleAnimation />
        </Triangle>

        <clipPath id="redClip">
          {/* For some reason, using #red directly doesn't work here. */}
          <Triangle>
            <RedTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="greenClip">
          <Triangle>
            <GreenTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="blueClip">
          <Triangle>
            <BlueTriangleAnimation />
          </Triangle>
        </clipPath>

        <clipPath id="whiteClip" clipPath="url(#redClip)">
          <Triangle>
            <GreenTriangleAnimation />
          </Triangle>
        </clipPath>
      </defs>

      {/* Put lighter colors on top so that edges artifacts are less visible. */}
      <use xlinkHref="#green" fill={GREEN} />
      <use xlinkHref="#blue" fill={BLUE} />
      <use xlinkHref="#red" fill={RED} />
      <use xlinkHref="#blue" fill={MAGENTA} clipPath="url(#redClip)" />
      <use xlinkHref="#red" fill={YELLOW} clipPath="url(#greenClip)" />
      <use xlinkHref="#green" fill={CYAN} clipPath="url(#blueClip)" />
      <use xlinkHref="#blue" fill="white" clipPath="url(#whiteClip)" />

      <text
        y="57px"
        x="50%"
        style={{
          textAnchor: "middle",
          fontSize: 21,
          fontFamily: "Unica One",
          textTransform: "lowercase"
        }}
      >
        IMAGE
      </text>
    </svg>
  );
}
