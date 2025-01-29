"use client";

import {
  Grid2 as Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";

type FilterOption = {
  label: string;
  value: string;
};
type FilterType = {
  label: string;
  value: string;
  options: FilterOption[];
};

const filters: FilterType[] = [
  {
    label: "Price",
    value: "price",
    options: [
      {
        label: "Under $5",
        value: "under-5",
      },
      {
        label: "$5 - $10",
        value: "5-10",
      },
      {
        label: "$10 - $25",
        value: "10-25",
      },
      {
        label: "$25 - $50",
        value: "25-50",
      },
      {
        label: "Over $50",
        value: "over-50",
      },
    ],
  },
  {
    label: "Genre",
    value: "genre",
    options: [
      {
        label: "Biography",
        value: "biography",
      },
      {
        label: "Fantasy",
        value: "fantasy",
      },
      {
        label: "Horror",
        value: "horror",
      },
      {
        label: "Mystery",
        value: "mystery",
      },
      {
        label: "Poetry",
        value: "poetry",
      },
      {
        label: "Romance",
        value: "romance",
      },
      {
        label: "Science Fiction",
        value: "science-fiction",
      },
      {
        label: "Self Help",
        value: "self-help",
      },
    ],
  },
];

const BooksFilter = () => {
  const router = useRouter();

  return (
    <Box sx={{ width: "10rem", display: { xs: "none", md: "block" } }}>
      {filters.map((filter) => (
        <Accordion
          key={filter.value}
          defaultExpanded
          disableGutters
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<LuChevronDown />}
            sx={{ textTransform: "uppercase" }}
          >
            {filter.label}
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={1}>
              {filter.options.map((option) => (
                <Button
                  variant="text"
                  key={option.value}
                  size="small"
                  onClick={() => {
                    router.push(`/books?${filter.value}=${option.value}`);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default BooksFilter;
