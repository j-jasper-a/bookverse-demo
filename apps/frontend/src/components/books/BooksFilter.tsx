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
    value: "genreId",
    options: [
      {
        label: "Biography",
        value: "bVOCHJffkl-aPYyqfRoax",
      },
      {
        label: "Fantasy",
        value: "irJIaAjkmjtuoEXsrSg4X",
      },
      {
        label: "Horror",
        value: "FvBhSaEYEXMdi6ase7SEb",
      },
      {
        label: "Mystery",
        value: "nx0K0-rAdDto6Pxmbl4N8",
      },
      {
        label: "Poetry",
        value: "yhur86lr-poetry",
      },
      {
        label: "Romance",
        value: "fQbt7zXUyt2OxQbYXlpW-",
      },
      {
        label: "Science Fiction",
        value: "Nv6RgX1W5HDe60GKt4cyX",
      },
      {
        label: "Self Help",
        value: "B0MExVqDwc5M22j4gZI3i",
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
