import Link from "next/link";
import { Box, Typography, keyframes } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";

const shimmer = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  10% {
    transform: translateX(200%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
`;

const sparkFade = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface HomeTileMainProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index?: number;
}

const HomeTileMain = ({
  title,
  description,
  image,
  link,
  index = 0,
}: HomeTileMainProps) => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSpark = useCallback(() => {
    const delay = 2000 + Math.random() * 5000;
    timeoutRef.current = setTimeout(() => {
      const id = sparkIdRef.current++;
      const spark: Spark = {
        id,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 6 + Math.random() * 10,
      };
      setSparks((prev) => [...prev, spark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 800);
      scheduleSpark();
    }, delay);
  }, []);

  useEffect(() => {
    scheduleSpark();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scheduleSpark]);

  return (
    <Link href={link} passHref>
      {/* Outer wrapper — no filter, sparks live here */}
      <Box
        sx={{
          mx: "auto",
          position: "relative",
          minHeight: { xs: 300, md: 450, lg: 500, xl: 700 },
          minWidth: { md: 150, xl: 250 },
          borderRadius: { xs: 2, md: 1 },
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Image layer — filter applies only here */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "filter 0.3s",
            filter: { md: "brightness(0.5)" },
            "*:hover > &": {
              filter: "brightness(1)",
            },
            // Dark overlay for mobile
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: { xs: "rgba(0, 0, 0, 0.8)", md: "transparent" },
              pointerEvents: "none",
            },
            // Shimmer wave
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              transform: "translateX(-100%) skewX(-15deg)",
              animation: `${shimmer} 8s ease-in-out infinite`,
              animationDelay: `${index * 0.4}s`,
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        />

        {/* Sparks — outside the filtered layer */}
        {sparks.map((spark) => (
          <Box
            key={spark.id}
            sx={{
              position: "absolute",
              left: `${spark.x}%`,
              top: `${spark.y}%`,
              width: spark.size,
              height: spark.size,
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow:
                "0 0 12px 6px rgba(255,255,255,1), 0 0 30px 12px rgba(255,200,50,0.8), 0 0 50px 20px rgba(255,180,0,0.4)",
              animation: `${sparkFade} 0.8s ease-out forwards`,
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Title bar */}
        <Box
          sx={{
            position: "absolute",
            p: { xs: 1, md: 2 },
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "1.1rem",
                sm: "1rem",
                md: "0.7rem",
                lg: "0.9rem",
                xl: "1.25rem",
              },
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Description */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: { xs: "none", md: "rgba(0, 0, 0, 0.7)" },
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: {
                  xs: "0.9rem",
                  sm: "0.75rem",
                  lg: "0.9rem",
                  xl: "1rem",
                },
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default HomeTileMain;
