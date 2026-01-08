import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import { marked } from 'marked';
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ScrapedBlogs = () => {

  const { id } = useParams();
  const [scrapedBlog, setScrapedBlog] = useState()

  const getScrapedBlog = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getScrapedBlog/${id}`, {
        method: 'GET'
      })

      const resData = await res.json();

      setScrapedBlog(resData.filteredscrapedBlog)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getScrapedBlog()
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ mx: "auto", p: 3, mt: 8 }}>
        {scrapedBlog?.length > 0 ? scrapedBlog?.map((elem, idx) => (
          <Card
            key={idx}
            elevation={3}
            sx={{ mb: 4, borderRadius: 3 }}
          >
            <CardContent>
              {/* Title */}
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {elem.title}
              </Typography>

              {/* Meta Info */}
              {/* <Typography variant="body2" color="text.secondary">
              Slug: {elem.slug}
            </Typography> */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created: {new Date(elem.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Typography>

                {/* AI Optimized Badge */}
                {elem.aiOptimized && (
                  <Chip
                    label="AI Optimized"
                    color="success"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Meta Title & Description */}
              <Typography variant="subtitle1" fontWeight={600}>
                Title
              </Typography>
              <Typography variant="body2" gutterBottom>
                {elem.metaTitle}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600}>
                Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {elem.metaDescription}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Markdown Content */}
              <Box
                sx={{
                  "& h1, & h2, & h3": { mt: 3, mb: 1 },
                  "& p": { mb: 2 },
                  "& ul": { pl: 3, mb: 2 },
                }}
              >
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {elem.content}
              </ReactMarkdown> */}
                <Box dangerouslySetInnerHTML={{ __html: marked(elem.content) }} style={{ marginTop: "20px", fontSize: "12px" }} />

              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Competitor Sources */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Sources
              </Typography>

              <Stack spacing={1} component="ol" sx={{ pl: 3 }}>
                {elem.competitorSources.map((source, sourceIdx) => (
                  <li key={sourceIdx}>
                    <Link
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ fontSize: "15px" }}
                    >
                      {source}
                    </Link>
                  </li>
                ))}
              </Stack>

            </CardContent>
          </Card>
        )):<Typography sx={{textAlign:"center"}}>No blogs found</Typography>}
      </Box>
    </>
  )
}

export default ScrapedBlogs