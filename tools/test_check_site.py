import tempfile
import unittest
from pathlib import Path

from check_site import check_site


class SiteChecks(unittest.TestCase):
    def test_local_assets_and_fragments(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "index.html").write_text('<a href="paper/#citation">Paper</a><img src="logo.svg" alt="HORUS">')
            (root / "logo.svg").write_text("<svg/>")
            (root / "paper").mkdir()
            (root / "paper/index.html").write_text('<h2 id="citation">Citation</h2>')
            self.assertEqual(check_site(root), (2, []))
            (root / "paper/index.html").write_text('<h2 id="other">Citation</h2>')
            self.assertIn("missing fragment", check_site(root)[1][0])

    def test_broken_assets_and_duplicate_ids_are_reported(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "index.html").write_text('<p id="x"></p><p id="x"></p><img src="missing.png">')
            errors = check_site(root)[1]
            self.assertEqual(len(errors), 3)
            self.assertTrue(any("duplicate ID" in error for error in errors))
            self.assertTrue(any("missing local target" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
