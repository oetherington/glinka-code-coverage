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
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   23","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"pub const InferResult = union(Variant) {"},
{"lineNum":"   26","line":"    pub const Variant = enum {"},
{"lineNum":"   27","line":"        Success,"},
{"lineNum":"   28","line":"        Error,"},
{"lineNum":"   29","line":"    };"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"    Success: Type.Ptr,"},
{"lineNum":"   32","line":"    Error: CompileError,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn success(ty: Type.Ptr) InferResult {","class":"lineCov","hits":"1","order":"3233","possible_hits":"1",},
{"lineNum":"   35","line":"        return InferResult{","class":"lineCov","hits":"1","order":"3235","possible_hits":"1",},
{"lineNum":"   36","line":"            .Success = ty,","class":"lineCov","hits":"1","order":"3234","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn err(e: CompileError) InferResult {","class":"lineCov","hits":"1","order":"4960","possible_hits":"1",},
{"lineNum":"   41","line":"        return InferResult{","class":"lineCov","hits":"1","order":"4962","possible_hits":"1",},
{"lineNum":"   42","line":"            .Error = e,","class":"lineCov","hits":"1","order":"4961","possible_hits":"1",},
{"lineNum":"   43","line":"        };"},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    pub fn getType(self: InferResult) Variant {","class":"lineCov","hits":"1","order":"5053","possible_hits":"1",},
{"lineNum":"   47","line":"        return @as(Variant, self);","class":"lineCov","hits":"1","order":"5054","possible_hits":"1",},
{"lineNum":"   48","line":"    }"},
{"lineNum":"   49","line":"};"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"test \"can create a success InferResult\" {","class":"lineCov","hits":"2","order":"6514","possible_hits":"2",},
{"lineNum":"   52","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"6515","possible_hits":"1",},
{"lineNum":"   53","line":"    const ptr = &boolean;","class":"lineCov","hits":"1","order":"6516","possible_hits":"1",},
{"lineNum":"   54","line":"    const result = InferResult.success(ptr);","class":"lineCov","hits":"1","order":"6517","possible_hits":"1",},
{"lineNum":"   55","line":"    try expectEqual(InferResult.Success, result.getType());","class":"lineCov","hits":"1","order":"6518","possible_hits":"1",},
{"lineNum":"   56","line":"    try expectEqual(ptr, result.Success);","class":"lineCov","hits":"2","order":"6519","possible_hits":"2",},
{"lineNum":"   57","line":"}"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"test \"can create an error InferResult\" {","class":"lineCov","hits":"2","order":"6520","possible_hits":"2",},
{"lineNum":"   60","line":"    const cursor = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"6521","possible_hits":"1",},
{"lineNum":"   61","line":"    const symbol = \"anySymbol\";"},
{"lineNum":"   62","line":"    const implicitAnyError = @import(\"../errors/implicit_any_error.zig\");"},
{"lineNum":"   63","line":"    const ImplicitAnyError = implicitAnyError.ImplicitAnyError;"},
{"lineNum":"   64","line":"    const err = ImplicitAnyError.new(cursor, symbol);","class":"lineCov","hits":"1","order":"6522","possible_hits":"1",},
{"lineNum":"   65","line":"    const compileError = CompileError.implicitAnyError(err);","class":"lineCov","hits":"1","order":"6523","possible_hits":"1",},
{"lineNum":"   66","line":"    const result = InferResult.err(compileError);","class":"lineCov","hits":"1","order":"6524","possible_hits":"1",},
{"lineNum":"   67","line":"    try expectEqual(InferResult.Error, result.getType());","class":"lineCov","hits":"1","order":"6525","possible_hits":"1",},
{"lineNum":"   68","line":"    try expectEqual(CompileError.Type.ImplicitAnyError, result.Error.getType());","class":"lineCov","hits":"2","order":"6526","possible_hits":"2",},
{"lineNum":"   69","line":"    const e = result.Error.ImplicitAnyError;","class":"linePartCov","hits":"2","order":"6527","possible_hits":"3",},
{"lineNum":"   70","line":"    try expectEqual(cursor, e.csr);","class":"linePartCov","hits":"1","order":"6528","possible_hits":"2",},
{"lineNum":"   71","line":"    try expectEqualStrings(symbol, e.symbol);","class":"lineCov","hits":"1","order":"6529","possible_hits":"1",},
{"lineNum":"   72","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:43:36", "instrumented" : 24, "covered" : 24,};
var merged_data = [];
