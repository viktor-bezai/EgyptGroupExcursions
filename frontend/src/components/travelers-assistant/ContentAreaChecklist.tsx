import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  ExpandLess,
  ExpandMore,
  FlightTakeoff,
  Hotel,
  LocalHospital,
  Luggage,
  Payment,
  PhoneIphone,
  RestartAlt,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface ChecklistItemInterface {
  category: string;
  list_to_do: string[];
}

// Map category keywords to icons
const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes("документ") || lowerCategory.includes("document"))
    return <FlightTakeoff />;
  if (lowerCategory.includes("здоров") || lowerCategory.includes("health"))
    return <LocalHospital />;
  if (
    lowerCategory.includes("багаж") ||
    lowerCategory.includes("luggage") ||
    lowerCategory.includes("вещ")
  )
    return <Luggage />;
  if (
    lowerCategory.includes("финанс") ||
    lowerCategory.includes("money") ||
    lowerCategory.includes("деньг")
  )
    return <Payment />;
  if (
    lowerCategory.includes("техник") ||
    lowerCategory.includes("tech") ||
    lowerCategory.includes("гаджет")
  )
    return <PhoneIphone />;
  if (lowerCategory.includes("отел") || lowerCategory.includes("hotel"))
    return <Hotel />;
  return <CheckCircle />;
};

const STORAGE_KEY = "travelChecklist";

const ContentAreaChecklist = () => {
  const { t } = useTranslation("common");
  const checklistItems = t("checklistItems", {
    returnObjects: true,
  }) as ChecklistItemInterface[];

  // State for checked items: { "categoryIndex-itemIndex": boolean }
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  // Load checked items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
    // Expand all categories by default
    const expanded: Record<number, boolean> = {};
    checklistItems.forEach((_, index) => {
      expanded[index] = true;
    });
    setExpandedCategories(expanded);
  }, [checklistItems.length]);

  // Save to localStorage when checked items change
  useEffect(() => {
    if (Object.keys(checkedItems).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }
  }, [checkedItems]);

  const handleToggle = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

  const handleReset = () => {
    setCheckedItems({});
    localStorage.removeItem(STORAGE_KEY);
  };

  // Calculate progress
  const totalItems = checklistItems.reduce(
    (acc, section) => acc + section.list_to_do.length,
    0,
  );
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  // Calculate category progress
  const getCategoryProgress = (categoryIndex: number, itemCount: number) => {
    let checked = 0;
    for (let i = 0; i < itemCount; i++) {
      if (checkedItems[`${categoryIndex}-${i}`]) checked++;
    }
    return { checked, total: itemCount };
  };

  return (
    <Box id="checklist-page" sx={{ maxWidth: "800px", mx: "auto", px: 2 }}>
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 1,
          color: "text.primary",
        }}
      >
        {t("checklist")}
      </Typography>

      {/* Progress Section */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          borderRadius: 2,
          bgcolor: "subtle.main",
          border: "1px solid",
          borderColor: "subtle.dark",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("progress") || "Progress"}: {checkedCount} / {totalItems}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {progress === 100 && (
              <Chip
                icon={<CheckCircle sx={{ fontSize: 16 }} />}
                label={t("completed") || "Completed!"}
                color="success"
                size="small"
              />
            )}
            <IconButton
              size="small"
              onClick={handleReset}
              sx={{ color: "text.secondary" }}
              title={t("reset") || "Reset"}
            >
              <RestartAlt fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "subtle.dark",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              bgcolor: progress === 100 ? "success.main" : "primary.main",
            },
          }}
        />
      </Box>

      {/* Checklist Categories */}
      {checklistItems.map((section, categoryIndex) => {
        const categoryProgress = getCategoryProgress(
          categoryIndex,
          section.list_to_do.length,
        );
        const isCompleted = categoryProgress.checked === categoryProgress.total;
        const isExpanded = expandedCategories[categoryIndex] ?? true;

        return (
          <Card
            key={categoryIndex}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: isCompleted ? "success.light" : "divider",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              overflow: "hidden",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* Category Header */}
            <Box
              onClick={() => handleToggleCategory(categoryIndex)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                cursor: "pointer",
                bgcolor: isCompleted ? "success.light" : "subtle.main",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: isCompleted ? "success.light" : "subtle.dark",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: isCompleted ? "success.main" : "primary.main",
                    color: "white",
                  }}
                >
                  {getCategoryIcon(section.category)}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: 600,
                      color: isCompleted ? "success.dark" : "text.primary",
                    }}
                  >
                    {section.category}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {categoryProgress.checked} / {categoryProgress.total}{" "}
                    {t("items") || "items"}
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small">
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Category Items */}
            <Collapse in={isExpanded}>
              <CardContent sx={{ p: 0 }}>
                {section.list_to_do.map((item, itemIndex) => {
                  const isChecked =
                    checkedItems[`${categoryIndex}-${itemIndex}`] || false;

                  return (
                    <Box
                      key={itemIndex}
                      onClick={() => handleToggle(categoryIndex, itemIndex)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        borderBottom:
                          itemIndex < section.list_to_do.length - 1
                            ? "1px solid"
                            : "none",
                        borderColor: "divider",
                        transition: "background-color 0.15s ease-in-out",
                        bgcolor: isChecked ? "subtle.light" : "transparent",
                        "&:hover": {
                          bgcolor: isChecked ? "subtle.main" : "action.hover",
                        },
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        sx={{
                          color: "text.disabled",
                          "&.Mui-checked": {
                            color: "success.main",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          color: isChecked ? "text.secondary" : "text.primary",
                          textDecoration: isChecked ? "line-through" : "none",
                          transition: "all 0.15s ease-in-out",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  );
                })}
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </Box>
  );
};

export default ContentAreaChecklist;
