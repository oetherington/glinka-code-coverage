var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   21","line":"const TokenType = @import(\"../../common/token.zig\").Token.Type;"},
{"lineNum":"   22","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"pub const OpError = struct {"},
{"lineNum":"   25","line":"    csr: Cursor,"},
{"lineNum":"   26","line":"    op: TokenType,"},
{"lineNum":"   27","line":"    ty: Type.Ptr,"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    pub fn new(csr: Cursor, op: TokenType, ty: Type.Ptr) OpError {","class":"lineCov","hits":"1","order":"2281","possible_hits":"1",},
{"lineNum":"   30","line":"        return OpError{","class":"lineCov","hits":"1","order":"2285","possible_hits":"1",},
{"lineNum":"   31","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2282","possible_hits":"1",},
{"lineNum":"   32","line":"            .op = op,","class":"lineCov","hits":"1","order":"2283","possible_hits":"1",},
{"lineNum":"   33","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"2284","possible_hits":"1",},
{"lineNum":"   34","line":"        };"},
{"lineNum":"   35","line":"    }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    pub fn report(self: OpError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2297","possible_hits":"4",},
{"lineNum":"   38","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"2301","possible_hits":"2",},
{"lineNum":"   39","line":"            \"Error: {d}:{d}: Operator \'{s}\' is not defined for type \'\","},
{"lineNum":"   40","line":"            .{"},
{"lineNum":"   41","line":"                self.csr.ln,","class":"linePartCov","hits":"1","order":"2298","possible_hits":"2",},
{"lineNum":"   42","line":"                self.csr.ch,","class":"linePartCov","hits":"1","order":"2299","possible_hits":"2",},
{"lineNum":"   43","line":"                @tagName(self.op),","class":"linePartCov","hits":"1","order":"2300","possible_hits":"2",},
{"lineNum":"   44","line":"            },"},
{"lineNum":"   45","line":"        );"},
{"lineNum":"   46","line":"        try self.ty.write(writer);","class":"linePartCov","hits":"1","order":"2302","possible_hits":"2",},
{"lineNum":"   47","line":"        try writer.print(\"\'\\n\", .{});","class":"linePartCov","hits":"1","order":"2303","possible_hits":"2",},
{"lineNum":"   48","line":"    }"},
{"lineNum":"   49","line":"};"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"test \"can initialize an OpError\" {","class":"lineCov","hits":"2","order":"2472","possible_hits":"2",},
{"lineNum":"   52","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2473","possible_hits":"1",},
{"lineNum":"   53","line":"    const op = TokenType.Sub;"},
{"lineNum":"   54","line":"    const ty = Type.newString();","class":"lineCov","hits":"1","order":"2474","possible_hits":"1",},
{"lineNum":"   55","line":"    const err = OpError.new(csr, op, &ty);","class":"lineCov","hits":"1","order":"2475","possible_hits":"1",},
{"lineNum":"   56","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2476","possible_hits":"1",},
{"lineNum":"   57","line":"    try expectEqual(op, err.op);","class":"lineCov","hits":"1","order":"2477","possible_hits":"1",},
{"lineNum":"   58","line":"    try expectEqual(&ty, err.ty);","class":"lineCov","hits":"1","order":"2478","possible_hits":"1",},
{"lineNum":"   59","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:45:33", "instrumented" : 19, "covered" : 19,};
var merged_data = [];
