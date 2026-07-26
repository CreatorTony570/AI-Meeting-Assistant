import markdown
from fpdf import FPDF
import os

class ExportService:
    @staticmethod
    def to_markdown(meeting_data: dict) -> str:
        md = f"# {meeting_data['title']}\n\n"
        md += f"## Executive Summary\n{meeting_data['summary']}\n\n"
        md += "## Action Items\n"
        for item in meeting_data['action_items']:
            md += f"- [ ] **{item['owner']}**: {item['task']} (Priority: {item['priority']})\n"
        return md

    @staticmethod
    def to_pdf(meeting_data: dict, output_path: str):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", 'B', 16)
        pdf.cell(40, 10, meeting_data['title'])
        # Simplified PDF generation logic
        pdf.output(output_path)

export_service = ExportService()
