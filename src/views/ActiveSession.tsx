import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../config";

interface End {
  scores: Array<number | string>;
}

const startingEnds = [{ scores: [] }];

export const ActiveSession = () => {
  const { sessionId: sessionIdParam } = useParams<{ sessionId: string }>();
  const sessionId = sessionIdParam ?? "";
  const [ends, setEnds] = useState<Array<End>>(startingEnds);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "sessions", sessionId),
      { includeMetadataChanges: true },
      (doc) => {
        setEnds(doc.data()?.ends ?? startingEnds);
        if (!loaded) {
          setLoaded(true);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [loaded, sessionId]);

  const addScore = (score: number | string) => {
    const numEnds = ends.length;
    const newEnds = [...ends];
    const arrowsInLastEnd = ends[numEnds - 1]?.scores?.length;

    if (arrowsInLastEnd === undefined || arrowsInLastEnd === 6) {
      newEnds.push({ scores: [score] });
    } else {
      newEnds[numEnds - 1].scores.push(score);
    }

    const sessionRef = doc(db, "sessions", sessionId);

    updateDoc(sessionRef, {
      ends: newEnds,
    });
  };

  const undoPreviousScore = () => {
    const lastEnd = ends.length - 1;
    const lastScoreIndex = ends[lastEnd].scores.length - 1;

    const newEnds = [...ends];

    if (lastScoreIndex > -1) {
      newEnds[lastEnd].scores = newEnds[lastEnd].scores.slice(
        0,
        lastScoreIndex
      );
    } else if (lastEnd > 0) {
      newEnds.splice(lastScoreIndex, 1);

      const newLastScoreIndex = ends[lastEnd - 1].scores.length - 1;
      if (newLastScoreIndex > -1) {
        newEnds[lastEnd - 1].scores = newEnds[lastEnd - 1].scores.slice(
          0,
          newLastScoreIndex
        );
      }
    } else {
      return;
    }

    const sessionRef = doc(db, "sessions", sessionId);

    updateDoc(sessionRef, {
      ends: newEnds,
    });
  };

  if (!loaded) {
    return <span>Loading...</span>;
  }

  const displayEnds = [...ends];
  if (displayEnds[ends.length - 1].scores.length === 6) {
    displayEnds.push({ scores: [] });
  }

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>End</TableCell>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayEnds.map((end, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                {Array.from(Array(6).keys()).map((cell) => (
                  <TableCell key={cell}>{end.scores[cell]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: "20px", "> *": { marginBottom: "15px" } }}>
        <Button
          onClick={() => undoPreviousScore()}
          sx={{ float: "right", marginBottom: "15px" }}
        >
          Undo
        </Button>
        <ButtonGroup fullWidth size="large" aria-label="large button group">
          <Button
            onClick={() => addScore(7)}
            sx={{ backgroundColor: "red" }}
            variant="contained"
          >
            7
          </Button>
          <Button
            onClick={() => addScore(8)}
            sx={{ backgroundColor: "red" }}
            variant="contained"
          >
            8
          </Button>
          <Button
            sx={{ backgroundColor: "#ffee58", color: "black" }}
            variant="contained"
            onClick={() => addScore(9)}
          >
            9
          </Button>
          <Button
            sx={{ backgroundColor: "#ffee58", color: "black" }}
            variant="contained"
            onClick={() => addScore(10)}
          >
            10
          </Button>
        </ButtonGroup>
        <ButtonGroup fullWidth size="large" aria-label="large button group">
          <Button
            sx={{ backgroundColor: "black", color: "white" }}
            onClick={() => addScore(3)}
            variant="contained"
          >
            3
          </Button>
          <Button
            sx={{ backgroundColor: "black", color: "white" }}
            variant="contained"
            onClick={() => addScore(4)}
          >
            4
          </Button>
          <Button
            onClick={() => addScore(5)}
            sx={{ backgroundColor: "blue" }}
            variant="contained"
          >
            5
          </Button>
          <Button
            onClick={() => addScore(6)}
            sx={{ backgroundColor: "blue" }}
            variant="contained"
          >
            6
          </Button>
        </ButtonGroup>

        <ButtonGroup fullWidth>
          <Button
            onClick={() => addScore("M")}
            sx={{ backgroundColor: "green" }}
            variant="contained"
          >
            M
          </Button>
          <Button
            sx={{ backgroundColor: "white", color: "black" }}
            size="large"
            onClick={() => addScore(1)}
            variant="contained"
          >
            1
          </Button>
          <Button
            sx={{ backgroundColor: "white", color: "black" }}
            onClick={() => addScore(2)}
            variant="contained"
          >
            2
          </Button>
          <Button
            onClick={() => addScore("X")}
            sx={{ backgroundColor: "#ffee58", color: "black" }}
            variant="contained"
          >
            X
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};
